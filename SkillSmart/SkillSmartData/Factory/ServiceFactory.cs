using SkillSmart.Base.Services;
using SkillSmart.Dto;
using SkillSmartMongoDA.Services;
using System.Configuration;
namespace SkillSmartData.Factory
{
    using Common;
    public class ServiceFactory
    {
        public static DatabaseFactorySectionHandler sectionHandler = (DatabaseFactorySectionHandler)ConfigurationManager.GetSection("DatabaseFactoryConfiguration");

        public static IJobSeekerService<JobSeeker> GetJobSeeker()
        {
            IJobSeekerService<JobSeeker> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new JobSeekerService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new JobSeekerService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }
    }
}
