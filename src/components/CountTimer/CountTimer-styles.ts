import styled from 'styled-components/macro';
import { colours } from '../../utils/shared-styles';

interface TimerInfoProps {
  alertMode?: boolean;
}
export const TimerInfo = styled.span`
  color: ${(props: TimerInfoProps) => props.alertMode && colours.red5};

  &:last-child {
    margin-left: 0.5rem;
  }
`;

export const CountTimerWrapper = styled.div`
  display: flex;
`;
