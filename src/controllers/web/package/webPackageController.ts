import prisma from '../../../database/database';
  export const getPackageById = async (packageId: number) => {
    try {
      const result = await prisma.package.findUnique({
        where: {
          ID: packageId
        },
      });
      return result
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