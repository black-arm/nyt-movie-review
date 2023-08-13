// components/Modal.js
import React from 'react';
import styles from './Modal.module.css';
import { ModalProps } from '@/model';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import MrImage from '../mrImage/MrImage';

const Modal = ({ isOpen, closeModal, reviewer }: ModalProps) => {

  if(!isOpen) return null;

  let src = reviewer?.multimedia?.resource?.src
  let height = reviewer?.multimedia?.resource?.height
  let width = reviewer?.multimedia?.resource?.width

  return (
    <div className={styles.modalOverlay} data-testid="modalReviewer">
      <div className={styles.modal}>
        <button data-testid="modalButton" className={styles.modalCloseButton} onClick={closeModal}>x</button>
        <div className={styles.modalContent}>
          <h3 data-testid="name">{reviewer?.display_name}</h3>
          <div className={styles.modalInfo}>
            { reviewer?.bio ? <div data-testid="bio" 
              className={styles.bio} dangerouslySetInnerHTML={{ __html: reviewer?.bio ? DOMPurify.sanitize(reviewer.bio): '' }}>
            </div> : <div data-testid="bio" ><h4>No Biography available</h4></div>}
            <div data-testid="image">
              <MrImage src={src} width={width} height={height} alt='profile'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;

const imageLoader = ({ src, width, quality }: any) => {
  return `${src}`
}
