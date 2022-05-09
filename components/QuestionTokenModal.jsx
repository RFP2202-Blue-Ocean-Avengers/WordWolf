import React from 'react';

Const QuestionTokenModal = () => {

  return (
    <div>
        <CloseButton></CloseButton>
      <div>
        <YesButton></YesButton>
        <NoButton></NoButton>
        <MaybeButton></MaybeButton>
      </div>
      <TokenList></TokenList>
    </div>
  )
}