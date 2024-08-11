export function WaitListSubmitLoader() {
    return (
        <div className="flex justify-center items-center w-fit h-fit">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-gray-900"></div>
        </div>
    );
}

export function NewsLetterSubmitLoader() {
    return (
        <div className="flex justify-center items-center w-fit h-fit">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
        </div>
    );
}

export function FetchDataLoader() {
    return (
        <div className="flex justify-center items-center w-fit h-fit">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-pink-300"></div>
        </div>
    );
}