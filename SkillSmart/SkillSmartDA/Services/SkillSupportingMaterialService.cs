using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class SkillSupportingMaterialService : EntityService<SkillSupportingMaterial>, ISkillSupportingMaterial<SkillSmart.Dto.SkillSupportingMaterial>
    {
        public SkillSupportingMaterialService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.SkillSupportingMaterial> GetAllSupportingMaterial(string id)
        {
            var jobSeekerSkillReferenceList = this.MongoCollection.FindAllAs<SkillSupportingMaterial>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.SkillSupportingMaterial> jobListCursor = new List<SkillSmart.Dto.SkillSupportingMaterial>();
            foreach (SkillSupportingMaterial jobSeeker in jobSeekerSkillReferenceList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.SkillSupportingMaterial jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SkillSupportingMaterial, SkillSmart.Dto.SkillSupportingMaterial>(jobSeeker);
                    jobListCursor.Add(jobSeekerObj);
                }
            }
            return jobListCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.SkillSupportingMaterial entity)
        {
            SkillSmartMongoDA.Entities.SkillSupportingMaterial seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SkillSupportingMaterial, SkillSmartMongoDA.Entities.SkillSupportingMaterial>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }


        public new SkillSmart.Dto.SkillSupportingMaterial GetById(string id)
        {
            SkillSupportingMaterial dbObj = base.GetById(id);
            SkillSmart.Dto.SkillSupportingMaterial seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SkillSupportingMaterial, SkillSmart.Dto.SkillSupportingMaterial>(dbObj);
            return seeker;
        }


        /// <summary>
        /// Function to Update WorkHistory details
        /// </summary>
        /// <param name="entity">WorkHistory Object</param>
        public void Update(SkillSmart.Dto.SkillSupportingMaterial entity)
        {
            SkillSupportingMaterial seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SkillSupportingMaterial, SkillSmartMongoDA.Entities.SkillSupportingMaterial>(entity);
            base.Update(seeker);
        }

        /// <summary>
        /// Function to Delete WorkHistory details
        /// </summary>
        /// <param name="entity">WorkHistory Object</param>
        public void Delete(SkillSmart.Dto.SkillSupportingMaterial entity)
        {
            SkillSupportingMaterial seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SkillSupportingMaterial, SkillSmartMongoDA.Entities.SkillSupportingMaterial>(entity);
            base.Delete(seeker);
        }

    }
}
