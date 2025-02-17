import Button, {ButtonProps} from '../common/Button.tsx';
/**
 * @fileOverview The button component for authentication pages.
 * @param {'blue' | 'purple'} [props.themeColor='blue'] - The theme color of the button.
 * @returns {JSX.Element} The JSX element for the button component.
 */
interface AuthButtonProps extends ButtonProps {
    themeColor?: 'blue' | 'purple';
}

const AuthButton = ({themeColor = 'blue', ...props}: AuthButtonProps) => {
    const gradients = {
        blue: 'from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500',
        purple: 'from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
    };

    return (
        <Button
            className={`w-full transform-gpu transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg bg-gradient-to-r ${gradients[themeColor]}`}
            size="lg"
            {...props}
        />
    );
};

export default AuthButton;