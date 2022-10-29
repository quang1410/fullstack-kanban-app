import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import iconUploadPhoto from 'assets/images/ic-upload-photo.svg';
import { colors } from 'styles/theme';
import { ThreeDotsLoader } from 'components/ThreeDotsLoader';

const UploadImageStyled = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 50%;
  label {
    cursor: pointer;
    input {
      display: none;
    }
    figure {
      border-radius: 50%;
      width: 80px;
      height: 80px;
      overflow: hidden;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      .cp-loading {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
      }
    }
    .cp-icon-upload {
      cursor: pointer;
      position: absolute;
      bottom: 0;
      right: 0;
      background: url(${iconUploadPhoto}) center no-repeat;
      width: 22px;
      height: 22px;
      opacity: 0.5;
      background-size: contain;
    }
  }
`;

const UploadImage = ({ src, loading, onChange }) => {
  return (
    <UploadImageStyled>
      <label>
        <input type="file" accept=".jpeg, .png" onChange={onChange} />
        <figure>
          <img src={src} alt="avatar" />
          {loading && (
            <div className="cp-loading">
              <ThreeDotsLoader color={colors.gray400} />
            </div>
          )}
        </figure>
        <div className="cp-icon-upload" />
      </label>
    </UploadImageStyled>
  );
};

UploadImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
};

UploadImage.defaultProps = {
  className: null,
  src: null,
  loading: false,
  onChange: () => {},
};

export default UploadImage;
