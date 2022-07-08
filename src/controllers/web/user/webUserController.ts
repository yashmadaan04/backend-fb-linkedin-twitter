import prisma from '../../../database/database';
export const addProfileContact = async (body: any) => {
    try {
      const { userId,birthMonth,birthDay,address,nationality,countryId,city,postCode,website,userProfilePhotoUrl,userProfileBackgroundUrl} = body;
      const profile= await prisma.userProfileContact.create({
        data: {  
            UserID:userId,
            BirthMonth:birthMonth,
            BirthDay:birthDay,                 
            Address: address,              
            Nationality:nationality,          
            CountryID:countryId,             
            City:city,           
            PostCode:postCode,
            Website:website,
            UserProfilePhotoUrl:userProfilePhotoUrl,           
            UserProfileBackgroundUrl:userProfileBackgroundUrl
        }
      });
      if(profile)
        return "Success"
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  }
  export const editProfileContact = async (body: any) => {
    try {
        const { profileContactId,birthMonth,birthDay,address,nationality,countryId,city,postCode,website,userProfilePhotoUrl,userProfileBackgroundUrl} = body;
        const profile: any = await prisma.userProfileContact.update({
            where: {
            ID: profileContactId
            },
                data: {
                    BirthMonth:birthMonth,
                    BirthDay:birthDay,                 
                    Address: address,              
                    Nationality:nationality,          
                    CountryID:countryId,             
                    City:city,           
                    PostCode:postCode,
                    Website:website,
                    UserProfilePhotoUrl:userProfilePhotoUrl,           
                    UserProfileBackgroundUrl:userProfileBackgroundUrl
                }
      });
      if (profile)
        return "Success";
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  }
  export const getProfileContactById = async (profileContactId: number) => {
    try {
      const result = await prisma.userProfileContact.findUnique({
        where: {
          ID: profileContactId
        },
        include:{
          Country:{
            select:{
              Name:true
            },
          },
        User:{
          select:{
            Phone:true,
            Email:true
          }
        }
        }
        
      });
      return result
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  };
  export const getProfileContactByUser = async (userId: number) => {
    try {
      const result = await prisma.userProfileContact.findMany({
        where: {
          UserID:userId
        },
        include:{
          Country:{
            select:{
              Name:true
            },
          },
        User:{
          select:{
            Phone:true,
            Email:true
          }
        }
        }
        
      });
      return result
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  };
  export const getAllProfilePrivacySettings = async () => {
    try {
      const result = await prisma.profilePrivacySettings.findMany({
        include:{
          PrivacySettingValue:{
            select:{
              SettingValue:true,
              SettingDescription:true
            }
          }
        }
      });
      return result
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  };