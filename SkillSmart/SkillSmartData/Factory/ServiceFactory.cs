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

        public static IAdditionalInformationService<AdditionalInformation> GetJobSeekerAdditionalInformation()
        {
            IAdditionalInformationService<SkillSmart.Dto.AdditionalInformation> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new AdditionalInformationService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new AdditionalInformationService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IOverviewService<Overview> GetJobSeekerOverview()
        {
            IOverviewService<SkillSmart.Dto.Overview> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new OverviewService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new OverviewService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ILanguageService<Language> GetJobSeekerLanguage()
        {
            ILanguageService<SkillSmart.Dto.Language> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new LanguageService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new LanguageService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IWorkHistoryService<WorkHistory> GetJobSeekerWorkHistory()
        {
            IWorkHistoryService<SkillSmart.Dto.WorkHistory> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new WorkHistoryService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new WorkHistoryService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IEducationService<Education> GetJobSeekerEducation()
        {
            IEducationService<SkillSmart.Dto.Education> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new EducationService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new EducationService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ISpecialityCourseService<SpecialityCourse> GetJobSeekerSpecialityCourse()
        {
            ISpecialityCourseService<SkillSmart.Dto.SpecialityCourse> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new SpecialityCourseService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new SpecialityCourseService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }


        public static IScholarshipService<Scholarship> GetJobSeekerScholarship()
        {
            IScholarshipService<SkillSmart.Dto.Scholarship> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new ScholarshipService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new ScholarshipService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IExtraCurricularActivityService<ExtraCurricularActivity> GetJobSeekerExtraCurricularActivityService()
        {
            IExtraCurricularActivityService<SkillSmart.Dto.ExtraCurricularActivity> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new ExtraCurricularActivityService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new ExtraCurricularActivityService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ICertificationService<Certification> GetJobSeekerCertification()
        {
            ICertificationService<SkillSmart.Dto.Certification> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new CertificationService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new CertificationService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ITrainingCourseService<TrainingCourse> GetJobSeekerTrainingCourse()
        {
            ITrainingCourseService<SkillSmart.Dto.TrainingCourse> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new TrainingCourseService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new TrainingCourseService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ICategoryService<Category> GetCategory()
        {
            ICategoryService<SkillSmart.Dto.Category> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new CategoryService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new CategoryService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ISkillService<Skill> GetSkill()
        {
            ISkillService<SkillSmart.Dto.Skill> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new SkillService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new SkillService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ISkillMapService<SkillMap> GetSkillMap()
        {
            ISkillMapService<SkillSmart.Dto.SkillMap> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new SkillMapService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new SkillMapService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IJobSeekerSkillListService<JobSeekerSkillList> GetJobSeekerSkillList()
        {
            IJobSeekerSkillListService<SkillSmart.Dto.JobSeekerSkillList> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new JobSeekerSkillListService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new JobSeekerSkillListService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ISkillAliasService<SkillAlias> GetSkillAlias()
        {
            ISkillAliasService<SkillSmart.Dto.SkillAlias> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new SkillAliasService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new SkillAliasService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ILookupService<LookupDto> GetLookupService(string collectionName)
        {
            ILookupService<LookupDto> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new LookupService(DatabaseFactory.CreateMongoDatabase(), collectionName);
                    break;
                default: serviceObj = new LookupService(DatabaseFactory.CreateMongoDatabase(), collectionName);
                    break;
            }
            return serviceObj;
        }

        public static ILookupByCriteriaService<LookupByCriteria> GetLookupByCriteriaService(string collectionName)
        {
            ILookupByCriteriaService<LookupByCriteria> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new LookupByCriteriaService(DatabaseFactory.CreateMongoDatabase(), collectionName);
                    break;
                default: serviceObj = new LookupByCriteriaService(DatabaseFactory.CreateMongoDatabase(), collectionName);
                    break;
            }
            return serviceObj;
        }

        public static IJobsListService<JobsList> GetJobsList()
        {
            IJobsListService<JobsList> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new JobsListService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new JobsListService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IJobSeekerAppliedJobsService<JobSeekerAppliedJobs> GetJobSeekerAppliedJobs()
        {
            IJobSeekerAppliedJobsService<JobSeekerAppliedJobs> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new JobSeekerAppliedJobsService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new JobSeekerAppliedJobsService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IJobSkillsService<JobSkills> GetJobSkills()
        {
            IJobSkillsService<JobSkills> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new JobSkillsService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new JobSkillsService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ISkillReferenceService<SkillReference> GetSkillReference()
        {
            ISkillReferenceService<SkillReference> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new SkillReferenceService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new SkillReferenceService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ISkillSupportingMaterial<SkillSupportingMaterial> GetSkillSupportingMaterial()
        {
            ISkillSupportingMaterial<SkillSupportingMaterial> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new SkillSupportingMaterialService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new SkillSupportingMaterialService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IRelatedExperienceService<RelatedExperience> GetSkillRelatedExperience()
        {
            IRelatedExperienceService<RelatedExperience> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new SkillRelatedExperienceService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new SkillRelatedExperienceService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ICompanyService<Company> GetCompany()
        {
            ICompanyService<Company> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new CompanyService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new CompanyService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static ISavedJobSearch<SavedJobSearch> GetSavedJobSearch()
        {
            ISavedJobSearch<SavedJobSearch> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new SavedJobSearchService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new SavedJobSearchService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IJobSeekerSavedJobsService<JobSeekerSavedJobs> GetJobSekerSavedJobs()
        {
            IJobSeekerSavedJobsService<JobSeekerSavedJobs> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new JobSeekerSavedJobsService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new JobSeekerSavedJobsService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IJobSeekerMessages<JobSeekerMessage> GetJobSekerMessages()
        {
            IJobSeekerMessages<JobSeekerMessage> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new JobSeekerMessageService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new JobSeekerMessageService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IEmployerMessages<EmployerMessage> GetEmployerMessages()
        {
            IEmployerMessages<EmployerMessage> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new EmployerMessageService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new EmployerMessageService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IEmployerService<Employer> GetEmployers()
        {
            IEmployerService<Employer> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new EmployerService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new EmployerService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IPrerequisiteService<Prerequisite> GetPrerequisite()
        {
            IPrerequisiteService<Prerequisite> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new PrerequisiteService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new PrerequisiteService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }

        public static IJobPrerequisiteService<JobPrerequisite> GetJobPrerequisite()
        {
            IJobPrerequisiteService<JobPrerequisite> serviceObj = null;
            switch (sectionHandler.ConnectionStringName)
            {
                case DataBaseType.SKILLSMART_MONGO_DB: serviceObj = new JobPrerequisiteService(DatabaseFactory.CreateMongoDatabase());
                    break;
                default: serviceObj = new JobPrerequisiteService(DatabaseFactory.CreateMongoDatabase());
                    break;
            }
            return serviceObj;
        }
    }
}
