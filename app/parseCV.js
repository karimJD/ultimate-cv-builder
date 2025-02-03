import pdf from 'pdf-parse-debugging-disabled';

export const parseCv = async (data) => {
  return pdf(data);
};
