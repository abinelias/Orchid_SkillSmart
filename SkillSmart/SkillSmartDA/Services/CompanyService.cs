using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class CompanyService : EntityService<Company>, ICompanyService<SkillSmart.Dto.Company>
    {
        public CompanyService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        public IEnumerable<SkillSmart.Dto.Company> GetAll()
        {
            var jobSeekerList = this.MongoCollection.FindAllAs<Company>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.Company> jobSeekerCursor = new List<SkillSmart.Dto.Company>();
            foreach (Company jobSeeker in jobSeekerList)
            {
                SkillSmart.Dto.Company jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Company, SkillSmart.Dto.Company>(jobSeeker);
                jobSeekerCursor.Add(jobSeekerObj);
            }
            return jobSeekerCursor;
        }

        /// <summary>
        /// Function to createjobseekers additional information
        /// </summary>
        /// <param name="entity">Additional information object</param>
        public void Create(SkillSmart.Dto.Company entity)
        {
            Company seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Company, SkillSmartMongoDA.Entities.Company>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }

        /// <summary>
        /// Function to get jobseeker additional information by id
        /// </summary>
        /// <param name="id">jobseeker id</param>
        /// <returns>jobseeker additional informaton object</returns>
        public new SkillSmart.Dto.Company GetById(string id)
        {
            Company dbObj = base.GetById(id);
            SkillSmart.Dto.Company seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Company, SkillSmart.Dto.Company>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to update jobseeker additional information
        /// </summary>
        /// <param name="entity">jobseeker additional informaton object</param>
        public void Update(SkillSmart.Dto.Company entity)
        {
            Company seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Company, SkillSmartMongoDA.Entities.Company>(entity);
            base.Update(seeker);         
        }

        public void Delete(SkillSmart.Dto.Company entity)
        { 
        }

    }
}
