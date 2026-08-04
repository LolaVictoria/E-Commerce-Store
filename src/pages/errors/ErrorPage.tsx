type Props = {
    title?: string;
    description?: string;
    onRetry?: () => void;
};

const ErrorPage = ({
    title = "Something went wrong",
    description = "Unable to load this page.",
    onRetry,
}: Props) => {

    
    return (
        <div className="min-h-[60vh] flex justify-center items-center px-6">

            <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">

                <div className="text-6xl">
                    ⚠️
                </div>

                <h2 className="text-2xl font-bold mt-4">
                    {title}
                </h2>

                <p className="text-gray-500 mt-3">
                    {description}
                </p>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                    >
                        Try Again
                    </button>
                )}

            </div>

        </div>
    );
};

export default ErrorPage;