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
  chooseExamination: (instanceID: number) => void;
}

const FrontPage: React.FC<Props> = props => {
  const [modal, setModal] = useState(ModalState.Hide);
  const [examToDelete, setExamToDelete] = useState(0);

  const requestDeletion = (instanceID: number) => {
    setExamToDelete(instanceID);
    setModal(ModalState.Delete);
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
    </div>
  );
};

export default FrontPage;
