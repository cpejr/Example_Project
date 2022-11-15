import styled from 'styled-components';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#78e5d5';
  }
  if (props.isDragReject) {
    return '#e57878';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  width: 100%;
`;

export const DropContainer = styled.div`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  transition: height 0.2s ease;

  border-color: ${(props) => getColor(props)};
`;

const messageColors = {
  default: '#999',
  error: 'var(--reject)',
  success: 'var(--success)',
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${(props) => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

const Button = styled.button`
  color: white;
  border: none;
  cursor: pointer;

  padding: 8px;
  border-radius: 4px;
`;

export const DeleteAll = styled(Button)`
  background: var(--reject);
`;

export const GetAll = styled(Button)`
  background: var(--success);
`;
