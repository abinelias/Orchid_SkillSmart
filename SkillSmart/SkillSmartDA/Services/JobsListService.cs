using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class JobsListService : EntityService<JobsList>, IJobsListService<SkillSmart.Dto.JobsList>
    {
        public JobsListService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.JobsList> GetAll()
        {
            var jobSeekerList = this.MongoCollection.FindAllAs<JobsList>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.JobsList> jobListCursor = new List<SkillSmart.Dto.JobsList>();
            foreach (JobsList jobSeeker in jobSeekerList)
            {
                SkillSmart.Dto.JobsList jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobsList, SkillSmart.Dto.JobsList>(jobSeeker);
                jobListCursor.Add(jobSeekerObj);
            }
            return jobListCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.JobsList entity)
        {
            SkillSmartMongoDA.Entities.JobsList seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobsList, SkillSmartMongoDA.Entities.JobsList>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }


        public new SkillSmart.Dto.JobsList GetById(string id)
        {
            JobsList dbObj = base.GetById(id);
            SkillSmart.Dto.JobsList seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobsList, SkillSmart.Dto.JobsList>(dbObj);
            return seeker;
        }


        public void Update(SkillSmart.Dto.JobsList entity)
        {
                  
        }


        public void Delete(SkillSmart.Dto.JobsList entity)
        {
           
        }

    }
}
