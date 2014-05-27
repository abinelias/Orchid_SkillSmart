using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class JobSeekerMessageService : EntityService<JobSeekerMessage>, IJobSeekerMessages<SkillSmart.Dto.JobSeekerMessage>
    {
        public JobSeekerMessageService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.JobSeekerMessage> GetAllJobSeekerMessages(string jobSeekerId)
        {
            var jobList = this.MongoCollection.FindAllAs<JobSeekerMessage>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.JobSeekerMessage> jobSeekerMessageCursor = new List<SkillSmart.Dto.JobSeekerMessage>();
            foreach (JobSeekerMessage messages in jobList)
            {

                if (messages.JobSeekerId == jobSeekerId)
                {
                    SkillSmart.Dto.JobSeekerMessage jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerMessage, SkillSmart.Dto.JobSeekerMessage>(messages);
                    jobSeekerMessageCursor.Add(jobSeekerObj);
                }
            }
            return jobSeekerMessageCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.JobSeekerMessage entity)
        {
            SkillSmartMongoDA.Entities.JobSeekerMessage seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobSeekerMessage, SkillSmartMongoDA.Entities.JobSeekerMessage>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }


        public new SkillSmart.Dto.JobSeekerMessage GetById(string id)
        {
            JobSeekerMessage dbObj = base.GetById(id);
            SkillSmart.Dto.JobSeekerMessage seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerMessage, SkillSmart.Dto.JobSeekerMessage>(dbObj);
            return seeker;
        }


        public void Update(SkillSmart.Dto.JobSeekerMessage entity)
        {
                  
        }


        public void Delete(SkillSmart.Dto.JobSeekerMessage entity)
        {
           
        }

    }
}
