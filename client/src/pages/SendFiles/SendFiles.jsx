import { useState, useCallback } from 'react';
import { uniqueId } from 'lodash';
import { filesize } from 'filesize';
import { Upload, FileList } from '../../components';
import { Container, Content } from './Styles';
import api from '../../services/api';

export default function SendFiles() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const updateFile = useCallback((id, data) => {
    setUploadedFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, ...data } : file))
    );
  }, []);

  const processUpload = useCallback(
    (uploadedFile) => {
      const data = new FormData();
      if (uploadedFile.file) {
        data.append('file', uploadedFile.file, uploadedFile.name);
      }

      api
        .post('/files', data, {
          onUploadProgress: ({ loaded, total }) => {
            const progress = Math.round((loaded * 100) / total);
            updateFile(uploadedFile.id, { progress });
          },
        })
        .then((response) => {
          console.log(
            `O arquivo ${uploadedFile.name} foi armazenado com sucesso!`
          );
          updateFile(uploadedFile.id, {
            uploaded: true,
            // eslint-disable-next-line no-underscore-dangle
            id: response.data._id,
            url: response.data.url,
          });
        })
        .catch((err) => {
          console.error(
            `Houve um problema ao fazer upload da imagem ${uploadedFile.name} no servidor AWS:\n${err}`
          );
          updateFile(uploadedFile.id, {
            error: true,
          });
        });
    },
    [updateFile]
  );

  const handleDeleteAll = useCallback(async () => {
    api
      .delete('/files')
      .then(() => {
        console.log('Todos os arquivos deletados com sucesso!');
        setUploadedFiles([]);
      })
      .catch((err) =>
        console.error(
          `Ocorreu uma falha ao tentar excluir todos os arquivos:\n${err}`
        )
      );
  }, []);

  const handleDelete = useCallback(async (id) => {
    api
      .delete(`/files/${id}`)
      .then((res) => {
        console.log(`Arquivo ${res.data.name} excluído com sucesso!`);
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
      })
      .catch((err) =>
        console.error(`Houve um problema ao tentar exlcuir o arquivo:\n${err}`)
      );
  }, []);

  const handleUpload = (files) => {
    const filesData = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedFiles((prev) => prev.concat(filesData));

    filesData.forEach(processUpload);
  };

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} onDeleteAll={handleDeleteAll} />
        {!!uploadedFiles.length && (
          <FileList files={uploadedFiles} onDelete={handleDelete} />
        )}
      </Content>
    </Container>
  );
}
