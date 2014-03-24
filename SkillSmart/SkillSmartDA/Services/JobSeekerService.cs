using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class JobSeekerService : EntityService<JobSeeker>, IJobSeekerService<SkillSmart.Dto.JobSeeker>
    {
        public JobSeekerService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.JobSeeker> GetAll()
        {
            var jobSeekerList = this.MongoCollection.FindAllAs<JobSeeker>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.JobSeeker> jobSeekerCursor = new List<SkillSmart.Dto.JobSeeker>();
            foreach (JobSeeker jobSeeker in jobSeekerList)
            {
                SkillSmart.Dto.JobSeeker jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeeker, SkillSmart.Dto.JobSeeker>(jobSeeker);
                jobSeekerCursor.Add(jobSeekerObj);
            }
            return jobSeekerCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.JobSeeker entity)
        {
            SkillSmartMongoDA.Entities.JobSeeker seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobSeeker, SkillSmartMongoDA.Entities.JobSeeker>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }

        /// <summary>
        /// Function to get a jobseeker details by Id
        /// </summary>
        /// <param name="id">jobseeker id</param>
        /// <returns>a jobseeker object</returns>
        public new SkillSmart.Dto.JobSeeker GetById(string id)
        {
            JobSeeker dbObj = base.GetById(id);
            SkillSmart.Dto.JobSeeker seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeeker, SkillSmart.Dto.JobSeeker>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to update a jobseeker details 
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Update(SkillSmart.Dto.JobSeeker entity)
        {
            JobSeeker seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobSeeker, SkillSmartMongoDA.Entities.JobSeeker>(entity);
            base.Update(seeker);         
        }

        /// <summary>
        /// Function to delete a jobseeker details 
        /// </summary>
        /// <param name="entity"></param>
        public void Delete(SkillSmart.Dto.JobSeeker entity)
        {
            JobSeeker seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobSeeker, SkillSmartMongoDA.Entities.JobSeeker>(entity);
            base.Delete(seeker);
        }



        public IEnumerable<SkillSmart.Dto.JobSeeker> GetJobSeekerList(int limit, int skip)
         {
             var jobSeekerList = this.MongoCollection.FindAllAs<JobSeeker>()
                 .SetSortOrder(SortBy<JobSeeker>.Descending(j => j.FirstName))
                 .SetLimit(limit)
                 .SetSkip(skip)
                 .SetFields(Fields<JobSeeker>.Include(j => j.Id, j => j.FirstName, j => j.LastName, j => j.Email,  j => j.Password));

            
             List<SkillSmart.Dto.JobSeeker> jobSeekerCursor = new List<SkillSmart.Dto.JobSeeker>();
             foreach (JobSeeker jobSeeker in jobSeekerList)
             {
                 SkillSmart.Dto.JobSeeker jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeeker, SkillSmart.Dto.JobSeeker>(jobSeeker);
                 jobSeekerCursor.Add(jobSeekerObj);
             }
             return jobSeekerCursor;
         }
    }
}
