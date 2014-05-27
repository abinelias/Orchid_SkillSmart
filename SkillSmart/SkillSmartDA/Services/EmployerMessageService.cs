using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class EmployerMessageService : EntityService<EmployerMessage>, IEmployerMessages<SkillSmart.Dto.EmployerMessage>
    {
        public EmployerMessageService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.EmployerMessage> GetAllEmployerMessages(string jobSeekerId)
        {
            var jobList = this.MongoCollection.FindAllAs<EmployerMessage>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.EmployerMessage> jobSeekerMessageCursor = new List<SkillSmart.Dto.EmployerMessage>();
            foreach (EmployerMessage messages in jobList)
            {

                if (messages.JobSeekerId == jobSeekerId)
                {
                    SkillSmart.Dto.EmployerMessage jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.EmployerMessage, SkillSmart.Dto.EmployerMessage>(messages);
                    jobSeekerMessageCursor.Add(jobSeekerObj);
                }
            }
            return jobSeekerMessageCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.EmployerMessage entity)
        {
            SkillSmartMongoDA.Entities.EmployerMessage seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.EmployerMessage, SkillSmartMongoDA.Entities.EmployerMessage>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }


        public new SkillSmart.Dto.EmployerMessage GetById(string id)
        {
            EmployerMessage dbObj = base.GetById(id);
            SkillSmart.Dto.EmployerMessage seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.EmployerMessage, SkillSmart.Dto.EmployerMessage>(dbObj);
            return seeker;
        }


        public void Update(SkillSmart.Dto.EmployerMessage entity)
        {
                  
        }


        public void Delete(SkillSmart.Dto.EmployerMessage entity)
        {
           
        }

    }
}
