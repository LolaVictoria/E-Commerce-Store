import { ClipLoader } from "react-spinners"

export const Spinner = () => {
    return(
        <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#2ECF5A" size={50} />
        </div>
    )
}