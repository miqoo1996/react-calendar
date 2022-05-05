import React from 'react';
import styled from 'styled-components';

const InfoText = styled.p`
    margin-top: ${({top}) => (top || 10)}px;
    color: ${({color}) => (color || 'black')};
    font-size: ${({size}) => (size || 12)}px;
    text-align: center;
    font-weight: 400;
    margin-bottom: 10px;
`;

const BudgetNotConfirmed = () => {

    return (
        <>
            <div className="question-title" style={{marginBottom: 0}}>
                <div style={{textAlign: 'center'}}>
                    <p className="page-title">Thank you for your submission.</p>
                    <InfoText size="18" top="25">
                        Our marketers require a minimum budget of $1,000 (some even a bit higher). Let's reconnect when that level of commitment makes more sense for you and your business.
                    </InfoText>
                </div>
            </div>

            <div>
                <InfoText size="15" color="#9f8f8f">Until then, wishing you the best!</InfoText>
            </div>
        </>
    );
}

export default BudgetNotConfirmed;