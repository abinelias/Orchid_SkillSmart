using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class JobPrerequisiteService : EntityService<JobPrerequisite>, IJobPrerequisiteService<SkillSmart.Dto.JobPrerequisite>
    {
        public JobPrerequisiteService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.JobPrerequisite> GetAll()
        {
            var jobSeekerList = this.MongoCollection.FindAllAs<JobPrerequisite>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.JobPrerequisite> jobListCursor = new List<SkillSmart.Dto.JobPrerequisite>();
            foreach (JobPrerequisite jobSeeker in jobSeekerList)
            {
                SkillSmart.Dto.JobPrerequisite jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobPrerequisite, SkillSmart.Dto.JobPrerequisite>(jobSeeker);
                jobListCursor.Add(jobSeekerObj);
            }
            return jobListCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.JobPrerequisite entity)
        {
            SkillSmartMongoDA.Entities.JobPrerequisite seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobPrerequisite, SkillSmartMongoDA.Entities.JobPrerequisite>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }


        public new SkillSmart.Dto.JobPrerequisite GetById(string id)
        {
            JobPrerequisite dbObj = base.GetById(id);
            SkillSmart.Dto.JobPrerequisite seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobPrerequisite, SkillSmart.Dto.JobPrerequisite>(dbObj);
            return seeker;
        }


        public void Update(SkillSmart.Dto.JobPrerequisite entity)
        {
            JobPrerequisite seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobPrerequisite, SkillSmartMongoDA.Entities.JobPrerequisite>(entity);
            base.Update(seeker);      
        }


        public void Delete(SkillSmart.Dto.JobPrerequisite entity)
        {
           
        }

    }
}
