import prisma from '../../../database/database';
export const addPackage = async (body: any) => {
    try {
      const { name,icon,description,isActive,createdBy,updatedBy} = body;
      const packages= await prisma.package.create({
        data: {                 
            Name:name,                 
            Icon: icon,              
            Description:description,          
            IsActive:isActive,             
            CreatedBy:createdBy,           
            UpdatedBy:updatedBy,           
            CreatedOn:new Date(),            
            UpdatedOn:new Date()
        }
      });
      if(packages)
        return "Success"
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  }
  export const editPackage = async (body: any) => {
    try {
        const { packageId,name,icon,description,isActive,createdBy,updatedBy} = body;
  
      const packages: any = await prisma.package.update({
        where: {
          ID: packageId
        },
        data: {
            Name:name,                 
            Icon: icon,              
            Description:description,          
            IsActive:isActive,             
            CreatedBy:createdBy,           
            UpdatedBy:updatedBy,
            CreatedOn:new Date(),            
            UpdatedOn:new Date()
        }
      });
      if (packages)
        return "Success";
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  }
  export const deletePackage = async (packageId: number) => {
    try {
      const packages = await prisma.package.update({
        where: {
          ID: packageId
        },
        data: {
          IsActive: false
        }
      })
      if (packages)
        return "Success"
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  }
  export const getPackageById = async (packageId: number) => {
    try {
      const packages = await prisma.package.findUnique({
        where: {
          ID: packageId
        },
      });
      return packages
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  };
  export const getAllPackages = async () => {
    try {
      const result = await prisma.package.findMany();
      return result
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  };
  export const addPackageFeature = async (body: any) => {
    try {
      const { packageId,featureId,isActive} = body;
      const result= await prisma.packageFeature.create({
        data: { 
            PackageID: packageId,                
            FeatureID: featureId,
            IsActive:isActive
        }
      });
      if(result)
        return "Success"
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  }
  export const editPackageFeature = async (body: any) => {
    try {
        const { packageFeatureId,packageId,featureId,isActive} = body;
  
      const result = await prisma.packageFeature.update({
        where: {
          ID: packageFeatureId
        },
        data: {
          PackageID: packageId,                
          FeatureID: featureId,
          IsActive:isActive
        }
      });
      if (result)
        return "Success";
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  }
  export const deletePackageFeature = async (packageFeatureId: number) => {
    try {
      const result = await prisma.packageFeature.update({
        where: {
          ID: packageFeatureId
        },
        data: {
          IsActive: false
        }
      })
      if (result)
        return "Success"
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  }
  export const getPackageFeatureById = async (packageFeatureId: number) => {
    try {
      const result = await prisma.packageFeature.findUnique({
        where: {
          ID: packageFeatureId
        },
      });
      return result
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  };
  export const getAllPackageFeatures = async () => {
    try {
      const result = await prisma.packageFeature.findMany();
      return result
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  };
  export const addpayAsYouGoPackage = async (body: any) => {
    try {
      const { name,price,featureId,countryCategoryId,isActive} = body;
      const result= await prisma.payAsYouGoPackage.create({
        data: { 
            Name:name,
            Price:price,
            FeatureID:featureId,
            CountryCategoryID:countryCategoryId,
            IsActive:isActive
        }
      });
      if(result)
        return "Success"
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  }
  export const editpayAsYouGoPackage = async (body: any) => {
    try {
      const { payAsYouGoPackageId,name,price,featureId,countryCategoryId,isActive} = body;
      const result = await prisma.payAsYouGoPackage.update({
        where: {
          ID: payAsYouGoPackageId
        },
        data: {
          Name:name,
          Price:price,
          FeatureID:featureId,
          CountryCategoryID:countryCategoryId,
          IsActive:isActive
        }
      });
      if (result)
        return "Success";
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  }
  export const deletepayAsYouGoPackage = async (payAsYouGoPackageId: number) => {
    try {
      const result = await prisma.payAsYouGoPackage.update({
        where: {
          ID: payAsYouGoPackageId
        },
        data: {
         IsActive:false
        }
      })
      if (result)
        return "Success"
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  }
  export const getpayAsYouGoPackageById = async (payAsYouGoPackageId: number) => {
    try {
      const result = await prisma.payAsYouGoPackage.findUnique({
        where: {
          ID: payAsYouGoPackageId
        },
      });
      return result
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  };
  export const getAllpayAsYouGoPackage = async () => {
    try {
      const result = await prisma.payAsYouGoPackage.findMany();
      return result
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  };