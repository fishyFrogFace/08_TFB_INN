import React from 'react';
import 'App.css';
import {
  QuestionResult,
  QuestionDefinition,
  SubjectDefinition,
  QuestionTemplate
} from 'Types';
import { checkPasswordSafety } from 'helpers/PasswordChecker';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import { updateSubjectResultList, updateAppPage } from 'redux/actions';
import CompletedSubject from 'exampages/CompletedSubject';
import Start from 'questions/Start';
import CopyText from 'questions/CopyText';
import WhereInPicture from 'questions/WhereInPicture';
import TextInput from 'questions/TextInput';
import MultipleButtons from 'questions/MultipleButtons';
import BigText from 'questions/BigText';
import Login from 'questions/Login';
import ChooseOne from 'questions/ChooseOne';
import ChooseOneMastery from 'questions/ChooseOneMastery';
import BottomBar from 'components/BottomBar';
import { validQuestions } from 'helpers/commonFunctions';

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
      subjectColor: props.currentSubjectResult.subjectColor,
      subjectTitle: props.currentSubjectResult.subjectTitle,
      results: newQuestionList
    });
    const incremented = props.currentQuestion + 1;
    props.updateCurrentQuestion(incremented);
  };

  const skipQuestion = () => {
    const incremented = props.currentQuestion + 1;
    props.updateCurrentQuestion(incremented);
  };

  const chooseQuestion = (question: QuestionDefinition) => {
    switch (question.templateID) {
      case QuestionTemplate.Start:
        return (
          <Start
            subjectColor={props.subject.subjectColor}
            resultTitle={question.questionContent.resultTitle!}
            updateResult={updateResult}
          />
        );

      case QuestionTemplate.CopyText:
        return (
          <CopyText
            subjectColor={props.subject.subjectColor}
            resultTitle={question.questionContent.resultTitle!}
            maxPoints={question.questionContent.maxPoints!}
            text={question.questionContent.text!}
            updateResult={updateResult}
            skipQuestion={skipQuestion}
          />
        );

      case QuestionTemplate.WhereInPicture:
        return (
          <WhereInPicture
            subjectColor={props.subject.subjectColor}
            resultTitle={question.questionContent.resultTitle!}
            imageInformation={question.questionContent.imageInformation!}
            maxPoints={question.questionContent.maxPoints!}
            text={question.questionContent.text!}
            updateResult={updateResult}
            skipQuestion={skipQuestion}
          />
        );

      case QuestionTemplate.TextInput:
        return (
          <TextInput
            subjectColor={props.subject.subjectColor}
            resultTitle={question.questionContent.resultTitle!}
            maxPoints={question.questionContent.maxPoints!}
            placeholder={question.questionContent.placeholder!}
            text={question.questionContent.text!}
            processString={checkPasswordSafety}
            updateResult={updateResult}
            skipQuestion={skipQuestion}
          />
        );

      case QuestionTemplate.MultipleButtons:
        return (
          <MultipleButtons
            subjectColor={props.subject.subjectColor}
            answerValues={question.questionContent.answerValues!}
            isImage={question.questionContent.isImage!}
            illustration={question.questionContent.illustration}
            resultTitle={question.questionContent.resultTitle!}
            text={question.questionContent.text!}
            correctAlternativeList={
              question.questionContent.correctAlternativeList!
            }
            updateResult={updateResult}
            skipQuestion={skipQuestion}
          />
        );

      case QuestionTemplate.LogIn:
        return (
          <Login
            subjectColor={props.subject.subjectColor}
            text={question.questionContent.text!}
            maxPoints={question.questionContent.maxPoints!}
            resultTitle={question.questionContent.resultTitle!}
            userInformation={question.questionContent.userInformation!}
            updateResult={updateResult}
            skipQuestion={skipQuestion}
          />
        );

      case QuestionTemplate.ChooseOne:
        return (
          <ChooseOne
            subjectColor={props.subject.subjectColor}
            text={question.questionContent.text!}
            illustration={question.questionContent.illustration}
            resultTitle={question.questionContent.resultTitle!}
            isImage={question.questionContent.isImage!}
            answerValues={question.questionContent.answerValues!}
            updateResult={updateResult}
            skipQuestion={skipQuestion}
          />
        );

      case QuestionTemplate.ChooseOneMastery:
        return (
          <ChooseOneMastery
            subjectColor={props.subject.subjectColor}
            text={question.questionContent.text!}
            illustration={question.questionContent.illustration}
            correctAlternative={question.questionContent.correctAlternative!}
            resultTitle={question.questionContent.resultTitle!}
            isImage={question.questionContent.isImage!}
            answerValues={question.questionContent.answerValues!}
            updateResult={updateResult}
            skipQuestion={skipQuestion}
          />
        );
      case QuestionTemplate.BigText:
        return (
          <BigText
            subjectColor={props.subject.subjectColor}
            resultTitle={question.questionContent.resultTitle!}
            text={question.questionContent.text!}
            placeholder={question.questionContent.placeholder!}
            updateResult={updateResult}
          />
        );

      case QuestionTemplate.CompletedSubject:
        return (
          <CompletedSubject
            subjectColor={props.subject.subjectColor}
            subject={props.subject.name}
            nextSubject={nextSubject}
          />
        );
    }
  };

  return (
    <div>
      <div className='question-container'>
        {chooseQuestion(props.subject.questions[props.currentQuestion])}
      </div>
      <BottomBar
        currentQuestion={props.currentQuestion}
        questions={validQuestions(props.subject.questions).map(
          question => question.name
        )}
      />
    </div>
  );
};

// Redux related

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
