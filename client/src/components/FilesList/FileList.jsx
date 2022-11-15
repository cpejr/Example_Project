import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import { TfiFiles } from 'react-icons/tfi';
import { Container, FileInfo, Preview } from './Styles';

function FilesList({ files, onDelete }) {
  const iconsSize = 24;
  return (
    <Container>
      {files.map((file) => (
        <li key={file.id}>
          <FileInfo>
            {file.type?.includes('image') ? (
              <Preview src={file.preview} />
            ) : (
              <TfiFiles
                size={36}
                style={{
                  marginRight: '10px',
                  minWidth: '36px',
                  minHeight: '36px',
                }}
              />
            )}
            <div>
              <strong>{file.name}</strong>
              <span>
                {file.readableSize}{' '}
                {file.uploaded && (
                  <button type="button" onClick={() => onDelete(file.id)}>
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!file.uploaded && !file.error && (
              <CircularProgressbar
                styles={{
                  root: { width: iconsSize },
                  path: { stroke: '#7159c1' },
                }}
                strokeWidth={10}
                value={file.progress}
              />
            )}
            {file.url && (
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <MdLink
                  style={{ marginRight: 8 }}
                  size={iconsSize}
                  color="#222"
                />
              </a>
            )}
            {file.uploaded && (
              <MdCheckCircle size={iconsSize} color="#78e5d5" />
            )}
            {file.error && <MdError size={iconsSize} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  );
}

export default FilesList;
