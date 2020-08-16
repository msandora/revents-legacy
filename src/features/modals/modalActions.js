import { MODAL_OPEN, MODAL_CLOSE } from './modalConstants';

export const openModal = (modalType, modalProps) => {
  // console.log(MODAL_OPEN, modalType, modalProps);
  return {
    type: MODAL_OPEN,
    payload: {
      modalType,
      modalProps,
    },
  };
};

export const closeModal = () => {
  // console.log(MODAL_CLOSE);
  return {
    type: MODAL_CLOSE,
  };
};
