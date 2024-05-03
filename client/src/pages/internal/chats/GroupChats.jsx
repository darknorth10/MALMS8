import { useEffect  } from "react"
import { useOutletContext } from "react-router-dom"
import GroupChat from "./Chat";

export const GroupChats = () => {

    const { setPagename, setCurrent } = useOutletContext();
    useEffect(() => {
        // set page name
        setPagename("Group Chats")

        // indicate that this is the current page
        setCurrent(true)

    }, [setPagename, setCurrent])
    return (
        <div className="bg-blue-gray-50 w-full md:p-10 rounded drop-shadow flex flex-col gap-9 items-center justify-center">
            <p className="p-5 text-lg border-s-4 border-indigo-600 bg-indigo-100 rounded drop-shadow-sm text-indigo-900">
                <span className="px-2 font-bold">Reminders:</span>
                Please be mindful of others, do not use any profanity as we are in a academic grounds.
            </p>
            <GroupChat/>
        </div>
    )
}

