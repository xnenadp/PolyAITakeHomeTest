import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
`;

export const Type = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  background-color: #fff;
`;

export const Fields = styled.div`
  display: flex;
  margin: 10px;
  background-color: #fff;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-weight: 400;
  padding-right: 10px;
  color: rgba(0, 0, 0, 0.6);
  transition: color 0.3s ease;
`;

export const Select = styled.select`
  padding-left: 14px;
  width: 200px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  outline: none;
  appearance: none; /* Remove default arrow */

  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath d="M7 10l5 5 5-5H7z" fill="%233f51b5"/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px 20px;

  &:focus {
    border-color: #3f51b5;
    box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
  }
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100px;
  margin-right: 8px;
  outline: none;

  &:focus {
    border-color: #3f51b5;
    box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
  }
`;

export const MinMaxContainer = styled.div`
  display: flex;
  gap: 16px;
`;