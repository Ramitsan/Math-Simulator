import React, { useEffect, useMemo, useState } from "react";
import { Expression } from "../../steps/expression/expression";
import { parseExpression } from "../../../parsers";
import { IStepProps } from "./IStepProps";

export default function Step({ stepIndex, activeStep, onCompleteStep, onChangeCorrectStepState }: IStepProps) {
  const stepData = {
    expression: '3 $frac(2, 9) + 4 $frac(3, 7)',
    messageTop: 'Переводим в неправильную дробь :',
  }
  return <>
    <div className="step">
      <div className="hint-slot hint-slot--up hint-slot--step0">
        {stepData.messageTop && <div className={`hint hint-up ${activeStep > stepIndex + 1 ? "hint--inactive" : ""}`}>
          {stepData.messageTop}
        </div>}
      </div>

      <Expression expression={parseExpression(stepData.expression)} onChangeCorrectState={(isCorrect) => {
        console.log(stepIndex, activeStep);
        onChangeCorrectStepState(stepIndex, isCorrect);
        if (isCorrect == 'correct' && activeStep == stepIndex + 1) {
          onCompleteStep(stepIndex);
        }

      }} isPassive={true} />
      <div className="hint-slot hint-slot--down">
      </div>
    </div>
    {(stepIndex < activeStep) && <div className="equal">=</div>} 
  </>
}