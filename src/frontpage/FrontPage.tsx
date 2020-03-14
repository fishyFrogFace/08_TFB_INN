import React, { useState } from 'react';
import '../App.css';
import './FrontPage.css';
import ExaminationList from './ExaminationList';
import { ExamInfo } from './ExaminationBlurb';
import Modal from 'components/Modal';

enum ModalState {
  Delete,
  Hide
}

interface Props {
  availableExaminations: ExamInfo[];
  chooseExamination: (instanceID: number, templateID: number) => void;
  deletePausedExam: (instanceID: number) => void;
}

const FrontPage: React.FC<Props> = props => {
  const [modal, setModal] = useState(ModalState.Hide);
  const [examToDelete, setExamToDelete] = useState(0);

  const closeModal = () => {
    setModal(ModalState.Hide);
  };

  const requestDeletion = (instanceID: number) => {
    setExamToDelete(instanceID);
    setModal(ModalState.Delete);
  };

  const deleteExam = () => {
    props.deletePausedExam(examToDelete);
    closeModal();
  };

  return (
    <div className='main'>
      <div className='questionContainer'>
        <ExaminationList
          examInfos={props.availableExaminations}
          chooseExamination={props.chooseExamination}
          requestDeletion={requestDeletion}
        />
      </div>
      <Modal
        show={modal === ModalState.Delete}
        closeModal={closeModal}
        confirmAction={deleteExam}
        title='Slett pauset kartlegging'
        body='All fremgang i kartleggingen vil bli slettet. Fortsette?'
        btnClass='delete-btn'
        btnText='Slett'
      />
    </div>
  );
};

export default FrontPage;
