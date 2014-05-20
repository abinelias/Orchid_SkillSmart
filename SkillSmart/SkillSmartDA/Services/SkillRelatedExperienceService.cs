using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class SkillRelatedExperienceService : EntityService<RelatedExperience>, IRelatedExperienceService<SkillSmart.Dto.RelatedExperience>
    {
        public SkillRelatedExperienceService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.RelatedExperience> GetAllRelatedExperience(string id)
        {
            var jobSeekerSkillReferenceList = this.MongoCollection.FindAllAs<RelatedExperience>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.RelatedExperience> jobListCursor = new List<SkillSmart.Dto.RelatedExperience>();
            foreach (RelatedExperience jobSeeker in jobSeekerSkillReferenceList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.RelatedExperience jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.RelatedExperience, SkillSmart.Dto.RelatedExperience>(jobSeeker);
                    jobListCursor.Add(jobSeekerObj);
                }
            }
            return jobListCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.RelatedExperience entity)
        {
            SkillSmartMongoDA.Entities.RelatedExperience seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.RelatedExperience, SkillSmartMongoDA.Entities.RelatedExperience>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }


        public new SkillSmart.Dto.RelatedExperience GetById(string id)
        {
            RelatedExperience dbObj = base.GetById(id);
            SkillSmart.Dto.RelatedExperience seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.RelatedExperience, SkillSmart.Dto.RelatedExperience>(dbObj);
            return seeker;
        }


        /// <summary>
        /// Function to Update WorkHistory details
        /// </summary>
        /// <param name="entity">WorkHistory Object</param>
        public void Update(SkillSmart.Dto.RelatedExperience entity)
        {
            RelatedExperience seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.RelatedExperience, SkillSmartMongoDA.Entities.RelatedExperience>(entity);
            base.Update(seeker);
        }

        /// <summary>
        /// Function to Delete WorkHistory details
        /// </summary>
        /// <param name="entity">WorkHistory Object</param>
        public void Delete(SkillSmart.Dto.RelatedExperience entity)
        {
            RelatedExperience seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.RelatedExperience, SkillSmartMongoDA.Entities.RelatedExperience>(entity);
            base.Delete(seeker);
        }

    }
}
