import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth"

const isValidated = async () => {
    const session = await getServerSession(authOptions)
    const user = session?.user
    return !!user
}

export default isValidated;