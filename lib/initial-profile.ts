import { currentUser, redirectToSignIn } from "@clerk/nextjs"

import { db } from "@/lib/db"

export const initialProfile = async () => {
  const user = await currentUser()

  if (!user) {
    return redirectToSignIn()
  }

  const { id, firstName, lastName, imageUrl, emailAddresses } = user

  const profile = await db.profile.findUnique({
    where: {
      userId: id,
    },
  })

  if (profile) {
    return profile
  }

  const newProfile = await db.profile.create({
    data: {
      userId: id,
      name: `${firstName} ${lastName}`,
      imageUrl: imageUrl,
      email: emailAddresses[0].emailAddress,
    },
  })

  return newProfile
}
