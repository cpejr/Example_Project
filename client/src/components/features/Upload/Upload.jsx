import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, DropContainer, UploadMessage, DeleteAll } from './Styles';

export default function Upload({ onUpload, onDeleteAll }) {
  const renderDragMessage = (isDragAccept, isDragReject) => {
    if (isDragAccept) {
      return (
        <UploadMessage type="success">Solter os arquivos aqui</UploadMessage>
      );
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage>Arraste arquivos aqui...</UploadMessage>;
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        'image/*': [],
        'audio/*': [],
        'text/plain': [],
        'application/pdf': [],
      },
      onDropAccepted: onUpload,
    });

  const inputMessage = useMemo(
    () => renderDragMessage(isDragAccept, isDragReject),
    [isDragAccept, isDragReject]
  );

  return (
    <Container>
      <DropContainer
        {...getRootProps({ isFocused, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        {inputMessage}
      </DropContainer>
      <DeleteAll type="button" onClick={onDeleteAll}>
        Apagar armazenamento
      </DeleteAll>
    </Container>
  );
}
