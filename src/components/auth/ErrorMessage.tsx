/**
 * @fileOverview This component is used to display error messages.
 * @param message - The error message to display.
 * @returns The {@link JSX.Element} for the error message component.
 */
const ErrorMessage = ({message}: { message?: string }) => {
    if (!message) return null;

    return (
        <div className="text-sm text-red-600 text-center bg-red-50 p-2 rounded-lg animate-shake">
            {message}
        </div>
    );
};

export default ErrorMessage;