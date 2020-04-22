import React from 'react';
import '../App.css';
import Start from '../questions/Start';
import CopyText from '../questions/CopyText';
import {
  QuestionResult,
  QuestionDefinition,
  SubjectDefinition,
  QuestionTemplate
} from '../Types';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import { updateSubjectResultList, updateAppPage } from 'redux/actions';
import CompletedSubject from 'exampages/CompletedSubject';
import WhereInPicture from '../questions/WhereInPicture';
import MultipleButtons from '../questions/MultipleButtons';

interface Props extends PropsFromRedux {
  subject: SubjectDefinition;
  currentQuestion: number;
  subjectOver: () => void;
  updateCurrentQuestion: (currentQuestion: number) => void;
}

const Subject: React.FC<Props> = props => {
  const nextSubject = () => {
    props.subjectOver();
  };

  const updateResult = (qResult: QuestionResult) => {
    const newQuestionList = props.currentSubjectResult.results.concat(qResult);
    props.updateSubjectResultList({
      subjectTitle: props.currentSubjectResult.subjectTitle,
      results: newQuestionList
    });
    const incremented = props.currentQuestion + 1;
    props.updateCurrentQuestion(incremented);
  };

  const chooseQuestion = (question: QuestionDefinition) => {
    switch (question.templateID) {
      case QuestionTemplate.Start:
        return (
          <Start
            resultTitle={question.questionContent.resultTitle!}
            maxPoints={question.questionContent.maxPoints!}
            updateResult={updateResult}
          />
        );

      case QuestionTemplate.CopyText:
        return (
          <CopyText
            resultTitle={question.questionContent.resultTitle!}
            maxPoints={question.questionContent.maxPoints!}
            text={question.questionContent.text!}
            updateResult={updateResult}
          />
        );

      case QuestionTemplate.WhereInPicture:
        return (
          <WhereInPicture
            resultTitle={question.questionContent.resultTitle!}
            imageInformation={question.questionContent.imageInformation!}
            maxPoints={question.questionContent.maxPoints!}
            text={question.questionContent.text!}
            updateResult={updateResult}
          />
        );

        case QuestionTemplate.MultipleButtons:
          return (
            <MultipleButtons
            answerValues={question.questionContent.answerValues!}
            isImage={question.questionContent.isImage!}
            resultTitle={question.questionContent.resultTitle!}
            maxPoints={question.questionContent.maxPoints!}
            text={question.questionContent.text!}
            correctAlt={question.questionContent.correctAlt!}
            updateResult={updateResult}
            />
        );

      case QuestionTemplate.CompletedSubject:
        return (
          <CompletedSubject
            subject={props.subject.name}
            nextSubject={nextSubject}
          />
        );
    }
  };

  return (
    <div className='questionContainer'>
      {chooseQuestion(props.subject.questions[props.currentQuestion])}
    </div>
  );
};

const mapStateToProps = (store: RootState) => ({
  currentSubjectResult: store.subjectResultList.find(
    res => res.subjectTitle === store.currentSubject
  )!
});

const mapToDispatch = {
  updateSubjectResultList,
  updateAppPage
};

type PropsFromRedux = ReturnType<typeof mapStateToProps> & typeof mapToDispatch;

const connector = connect(mapStateToProps, mapToDispatch);

export default connector(Subject);
