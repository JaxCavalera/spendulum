import styled from 'styled-components';
import { colours } from '../../utils/shared-styles';

interface TimerInfoProps {
  alertMode?: boolean;
}
export const TimerInfo = styled.span`
  font-size: 1.2rem;
  color: ${(props: TimerInfoProps) => props.alertMode && colours.red5};

  &:last-child {
    margin-left: 0.5rem;
  }
`;

export const CountTimerWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;
