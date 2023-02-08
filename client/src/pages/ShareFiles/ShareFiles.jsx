import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect, useCallback } from 'react';
import { uniqueId } from 'lodash';
import { filesize } from 'filesize';
import { Upload, FileList } from '../../components/features';
import { Container, Content } from './Styles';
import api from '../../services/api/api';

export default function ShareFiles() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const roomName = localStorage.getItem('roomName');

  const filesWithBlobUrls = useCallback(async (files) => {
    if (!files.length) return files;
    const requests = files.map(({ url }) =>
      axios(url, { responseType: 'blob' })
    );

    const responses = await Promise.all(requests);
    return files.map((file, i) => {
      const blob = responses[i].data;
      const { type } = blob;

      return {
        ...file,
        preview: URL.createObjectURL(blob),
        type,
      };
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/files?roomName=${roomName}`);
        const files = await filesWithBlobUrls(res.data);
        const filesData = files.map((file) => ({
          file,
          // eslint-disable-next-line no-underscore-dangle
          id: file._id,
          type: file.type,
          name: file.name,
          readableSize: filesize(file.size),
          preview: file.preview,
          progress: 100,
          uploaded: true,
          error: false,
          url: file.url,
        }));
        setUploadedFiles(filesData);
        return { files: filesData };
      } catch (err) {
        console.error(err);
        return err;
      }
    };

    toast.promise(fetchData(), {
      loading: 'Carregando arquivos do armazenamento',
      success: ({ files }) =>
        files.length
          ? 'Arquivos carregados com sucesso'
          : 'Sem arquivos armazenados',
      error: 'Ocorreu um erro ao carregar os arquivos',
    });
  }, [filesWithBlobUrls, roomName]);

  const handleDeleteAll = useCallback(async () => {
    return toast.promise(api.delete(`/files?roomName=${roomName}`), {
      loading: 'Deletando arquivos',
      success: () => {
        setUploadedFiles([]);
        return 'Todos os arquivos deletados com sucesso!';
      },
      error: 'Ocorreu uma falha ao tentar excluir todos os arquivos',
    });
  }, [roomName]);

  const handleDelete = useCallback(async (id) => {
    return toast.promise(api.delete(`/files/${id}`), {
      loading: 'Deletando arquivo',
      success: () => {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
        return `Arquivo excluído com sucesso!`;
      },
      error: `Ocorreu um problema ao excluir o arquivo`,
    });
  }, []);

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
        .post(`/files?roomName=${roomName}`, data, {
          onUploadProgress: ({ loaded, total }) => {
            const progress = Math.round((loaded * 100) / total);
            updateFile(uploadedFile.id, { progress });
          },
        })
        .then((response) => {
          toast.success(`Arquivo armazenado com sucesso!`);
          updateFile(uploadedFile.id, {
            uploaded: true,
            // eslint-disable-next-line no-underscore-dangle
            id: response.data._id,
            url: response.data.url,
          });
        })
        .catch((err) => {
          console.error(err);
          toast.error(`Houve um problema ao fazer armazenar o arquivo`);
          updateFile(uploadedFile.id, {
            error: true,
          });
        });
    },
    [updateFile, roomName]
  );

  const handleUpload = useCallback(
    (files) => {
      const filesData = files.map((file) => ({
        file,
        id: uniqueId(),
        type: file.type,
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
    },
    [processUpload]
  );

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} onDeleteAll={handleDeleteAll} />
        {!!uploadedFiles.length && (
          <FileList files={uploadedFiles} onDelete={handleDelete} />
        )}
      </Content>
      <Toaster />
    </Container>
  );
}
