// components/Modal.js
import React from 'react';
import styles from './Modal.module.css';
import { ModalProps } from '@/model';
import Image from 'next/image';
import DOMPurify from 'dompurify';

const Modal = ({ isOpen, closeModal, reviewer }: ModalProps) => {

  if(!isOpen) return null;

  let src = '/images/no_photo_available.jpeg', width = 250, height = 250;
  
  if(reviewer?.multimedia?.resource && reviewer.multimedia.resource.src){
    src = reviewer.multimedia.resource.src
  }

  if(reviewer?.multimedia?.resource && reviewer.multimedia.resource.width){
    width = reviewer.multimedia.resource.width;
  }

  if(reviewer?.multimedia?.resource && reviewer.multimedia.resource.height){
    height = reviewer.multimedia.resource.height;
  }

  return (
    <div className={styles.modalOverlay} data-testid="modalReviewer">
      <div className={styles.modal}>
        <button data-testid="modalButton" className={styles.modalCloseButton} onClick={closeModal}>x</button>
        <div className={styles.modalContent}>
          <h3 data-testid="name">{reviewer?.display_name}</h3>
          <div className={styles.modalInfo}>
            <div data-testid="bio" 
              className={styles.bio} dangerouslySetInnerHTML={{ __html: reviewer?.bio ? DOMPurify.sanitize(reviewer.bio): '' }}>
            </div>
            <div data-testid="image">
              
              <Image loader={imageLoader}  src={src} width={width} height={height} alt='profile'/>
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
