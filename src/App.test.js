import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  render(<App />);
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  if(email) {
    userEvent.type(emailInputElement, email);
  }
  if(password) {
    userEvent.type(passwordInputElement, password);
  }
  if(confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }
  return { emailInputElement, passwordInputElement, confirmPasswordInputElement };
};

const clickSubmit = () => userEvent.click(screen.getByRole('button', { name: /submit/i }));

describe("Form validation", () => {
  test('inputs should be initially empty', () => {
    const { emailInputElement, passwordInputElement, confirmPasswordInputElement } = typeIntoForm({});
    expect(emailInputElement.value).toBe('');
    expect(passwordInputElement.value).toBe('');
    expect(confirmPasswordInputElement.value).toBe('');
  });
  
  test('Should be able to type an email', () => {
    const { emailInputElement } = typeIntoForm({ email: 'selena@gmail.com' });
    expect(emailInputElement.value).toBe('selena@gmail.com');
  });
  
  test('Should be able to type a password', () => {
    const { passwordInputElement } = typeIntoForm({ password: 'secret-password' });
    expect(passwordInputElement.value).toBe('secret-password');
  });
  
  test('Should be able to type confirm password', () => {
    const { confirmPasswordInputElement } = typeIntoForm({ confirmPassword: 'secret-password' });
    expect(confirmPasswordInputElement.value).toBe('secret-password');
  });
  
  test('Should show email error message on invalid email', () => {
    const getEmailElementError = () => screen.queryByText(/the email is invalid/i);
    expect(getEmailElementError()).not.toBeInTheDocument();
    
    typeIntoForm({ email: 'selenagmail.com' });
      
    clickSubmit();
  
    expect(getEmailElementError()).toBeInTheDocument();
  });
  
  test('Should show password error if password is less than 5 characters', () => {
    const getErrorElement = () => screen.queryByText(/the password you entered should contain 5 or more characters/i);
    
    typeIntoForm({ email: 'selena@gmail.com', password: '1234' });
    
    expect(getErrorElement()).not.toBeInTheDocument();
  
    clickSubmit();
  
    expect(getErrorElement()).toBeInTheDocument();
  });
  
  test("Should show confirm password error if password doesn't match", () => {
    const getErrorElement = () => screen.queryByText(/the password doesn't match. Try again/i);
    
    expect(getErrorElement()).not.toBeInTheDocument();
  
    typeIntoForm({ email: 'selena@gmail.com', password: '12345', confirmPassword: '123456' });
  
    clickSubmit();
  
    expect(getErrorElement()).toBeInTheDocument();
  });
  
  test("Should show no error message if every input is valid", () => {
    typeIntoForm({ email: 'selena@gmail.com', password: '123456', confirmPassword: '123456' });
    
    clickSubmit();
  
    expect(screen.queryByText(/the email is invalid/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/the password doesn't match. Try again/i)).not.toBeInTheDocument();
  });
});
