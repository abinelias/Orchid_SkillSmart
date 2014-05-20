using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class SkillReferenceService : EntityService<SkillReference>, ISkillReferenceService<SkillSmart.Dto.SkillReference>
    {
        public SkillReferenceService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.SkillReference> GetAllReference(string id)
        {
            var jobSeekerSkillReferenceList = this.MongoCollection.FindAllAs<SkillReference>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.SkillReference> jobListCursor = new List<SkillSmart.Dto.SkillReference>();
            foreach (SkillReference jobSeeker in jobSeekerSkillReferenceList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.SkillReference jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SkillReference, SkillSmart.Dto.SkillReference>(jobSeeker);
                    jobListCursor.Add(jobSeekerObj);
                }
            }
            return jobListCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.SkillReference entity)
        {
            SkillSmartMongoDA.Entities.SkillReference seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SkillReference, SkillSmartMongoDA.Entities.SkillReference>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }


        public new SkillSmart.Dto.SkillReference GetById(string id)
        {
            SkillReference dbObj = base.GetById(id);
            SkillSmart.Dto.SkillReference seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SkillReference, SkillSmart.Dto.SkillReference>(dbObj);
            return seeker;
        }


        /// <summary>
        /// Function to Update WorkHistory details
        /// </summary>
        /// <param name="entity">WorkHistory Object</param>
        public void Update(SkillSmart.Dto.SkillReference entity)
        {
            SkillReference seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SkillReference, SkillSmartMongoDA.Entities.SkillReference>(entity);
            base.Update(seeker);
        }

        /// <summary>
        /// Function to Delete WorkHistory details
        /// </summary>
        /// <param name="entity">WorkHistory Object</param>
        public void Delete(SkillSmart.Dto.SkillReference entity)
        {
            SkillReference seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SkillReference, SkillSmartMongoDA.Entities.SkillReference>(entity);
            base.Delete(seeker);
        }

    }
}
