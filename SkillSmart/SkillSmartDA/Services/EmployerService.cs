using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class EmployerService : EntityService<Employer>, IEmployerService<SkillSmart.Dto.Employer>
    {
        public EmployerService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.Employer> GetAll(string companyId)
        {
            var employerList = this.MongoCollection.FindAllAs<Employer>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.Employer> employerCursor = new List<SkillSmart.Dto.Employer>();
            foreach (Employer employer in employerList)
            {
                if (employer.CompanyId == companyId)
                {
                    SkillSmart.Dto.Employer employerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Employer, SkillSmart.Dto.Employer>(employer);
                    employerCursor.Add(employerObj);
                }
            }
            return employerCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.Employer entity)
        {
            SkillSmartMongoDA.Entities.Employer employer = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Employer, SkillSmartMongoDA.Entities.Employer>(entity);
            base.Create(employer);
            entity.Id = employer.Id;
        }

        /// <summary>
        /// Function to get a jobseeker details by Id
        /// </summary>
        /// <param name="id">jobseeker id</param>
        /// <returns>a jobseeker object</returns>
        public new SkillSmart.Dto.Employer GetById(string id)
        {
            Employer dbObj = base.GetById(id);
            SkillSmart.Dto.Employer employer = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Employer, SkillSmart.Dto.Employer>(dbObj);
            return employer;
        }

        /// <summary>
        /// Function to update a jobseeker details 
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Update(SkillSmart.Dto.Employer entity)
        {
            Employer employer = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Employer, SkillSmartMongoDA.Entities.Employer>(entity);
            base.Update(employer);         
        }

        /// <summary>
        /// Function to delete a jobseeker details 
        /// </summary>
        /// <param name="entity"></param>
        public void Delete(SkillSmart.Dto.Employer entity)
        {
            Employer employer = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Employer, SkillSmartMongoDA.Entities.Employer>(entity);
            base.Delete(employer);
        }
    }
}
