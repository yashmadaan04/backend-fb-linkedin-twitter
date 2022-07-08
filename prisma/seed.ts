import { PrismaClient } from '@prisma/client'
import { userData } from './mockDataForSeeding/userData'
import { userTypeData } from './mockDataForSeeding/userTypeData'
import { countryData } from './mockDataForSeeding/countryData'
import { countryCategoryData } from './mockDataForSeeding/countryCategoryData'
import { packageData } from './mockDataForSeeding/packageData'
import { authenticationTypeData } from './mockDataForSeeding/authenticationTypeData'
import { packageFeatureData } from './mockDataForSeeding/packageFeatureData'
import { featureData } from './mockDataForSeeding/featureData'
import { payAsYouGoPackageData } from './mockDataForSeeding/payAsYouGoPackageData'
import { passwordResetData } from './mockDataForSeeding/passwordResetData'
import { userPostData } from './mockDataForSeeding/userPostData'
import { reactionTypeData } from './mockDataForSeeding/reactionTypeData'
import { postReactionData } from './mockDataForSeeding/postReactionData'
import { commentReactionData } from './mockDataForSeeding/commentReactionData'
import { postToBeHiddenFromData } from './mockDataForSeeding/postToBeHiddenFromData'
import { postReportedData } from './mockDataForSeeding/postReportedData'
import { commentReportedData } from './mockDataForSeeding/commentReportedData'
import { postCommentsData } from './mockDataForSeeding/postCommentsData'
import { userConnectionData } from './mockDataForSeeding/userConnectionData'
import { userProfileContactData } from './mockDataForSeeding/userProfileContactData'
import { profilePrivacySettingsData } from './mockDataForSeeding/profilePrivacySettingsData'
import { privacySettingValueData } from './mockDataForSeeding/privacySettingValueData'
const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userTypeData) {
    const item = await prisma.userType.create({
      data: u,
    })
    console.log(`Created user type with id: ${item.ID}`)
  }
  for (const u of countryCategoryData) {
    const item = await prisma.countryCategory.create({
      data: u,
    })
    console.log(`Created user type with id: ${item.ID}`)
  }
  for (const u of countryData) {
    const item = await prisma.country.create({
      data: u,
    })
    console.log(`Created user type with id: ${item.ID}`)
  }
  for (const u of authenticationTypeData) {
    const item = await prisma.authenticationType.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of userData) {
    const item = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of packageData) {
    const item = await prisma.package.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of featureData) {
    const item = await prisma.feature.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of payAsYouGoPackageData) {
    const item = await prisma.payAsYouGoPackage.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of packageFeatureData) {
    const item = await prisma.packageFeature.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of passwordResetData) {
    const item = await prisma.passwordReset.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of userPostData) {
    const item = await prisma.userPost.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of reactionTypeData) {
    const item = await prisma.reactionType.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of postReactionData) {
    const item = await prisma.postReactions.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  
  for (const u of postToBeHiddenFromData) {
    const item = await prisma.postToBeHiddenFrom.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of postReportedData) {
    const item = await prisma.postReported.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of postCommentsData) {
    const item = await prisma.postComments.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of commentReactionData) {
    const item = await prisma.commentReactions.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of commentReportedData) {
    const item = await prisma.commentReported.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of userConnectionData) {
    const item = await prisma.userConnection.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of userProfileContactData) {
    const item = await prisma.userProfileContact.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of profilePrivacySettingsData) {
    const item = await prisma.profilePrivacySettings.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  for (const u of privacySettingValueData) {
    const item = await prisma.privacySettingValue.create({
      data: u,
    })
    console.log(`Created user with id: ${item.ID}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })