/* eslint-disable no-undef */
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInForm } from '../../components/SignIn';
// ...

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button

      const mockSignIn = jest.fn();

      render(<SignInForm onSubmit={mockSignIn}/>);


      fireEvent.changeText(screen.getByPlaceholderText('Username'), "testUsername");
      fireEvent.changeText(screen.getByPlaceholderText('Password'), "testPassword");
      fireEvent.press(screen.getByTestId('signInButton'));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(mockSignIn).toHaveBeenCalledTimes(1);
        expect(mockSignIn.mock.calls[0][0]).toEqual({
          username: "testUsername",
          password: "testPassword",
        });
      });
    });
  });
});