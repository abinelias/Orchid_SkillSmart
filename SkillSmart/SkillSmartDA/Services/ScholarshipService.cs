using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class ScholarshipService : EntityService<Scholarship>, IScholarshipService<SkillSmart.Dto.Scholarship>
    {
        public ScholarshipService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to get all scholoaship
        /// </summary>
        /// <param name="id">EducationId</param>
        /// <returns>Scholarship Object</returns>
        public IEnumerable<SkillSmart.Dto.Scholarship> GetAllScholarshipById(string id)
        {
            var jobSeekerScholarshipList = this.MongoCollection.FindAllAs<Scholarship>();

            List<SkillSmart.Dto.Scholarship> jobSeekerScholarship = new List<SkillSmart.Dto.Scholarship>();
            foreach (Scholarship jobSeeker in jobSeekerScholarshipList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.Scholarship jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Scholarship, SkillSmart.Dto.Scholarship>(jobSeeker);
                    jobSeekerScholarship.Add(jobSeekerObj);
                }
            }
            return jobSeekerScholarship;
        }

        /// <summary>
        /// Function to create a scholoaship
        /// </summary>
        /// <param name="entity">Scholarship Object</param>
        public void Create(SkillSmart.Dto.Scholarship entity)
        {
            Scholarship seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Scholarship, SkillSmartMongoDA.Entities.Scholarship>(entity);
            base.Create(seeker);
        }

        /// <summary>
        /// Function to get a scholoaship deatils
        /// </summary>
        /// <param name="id">ScholarshipId</param>
        /// <returns>Scholarship Object</returns>
        public new SkillSmart.Dto.Scholarship GetById(string id)
        {
            Scholarship dbObj = base.GetById(id);
            SkillSmart.Dto.Scholarship seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Scholarship, SkillSmart.Dto.Scholarship>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to Update a scholoaship
        /// </summary>
        /// <param name="entity">Scholarship Object</param>
        public void Update(SkillSmart.Dto.Scholarship entity)
        {
            Scholarship seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Scholarship, SkillSmartMongoDA.Entities.Scholarship>(entity);
            base.Update(seeker);         
        }

        /// <summary>
        /// Function to Delete a scholoaship
        /// </summary>
        /// <param name="entity">Scholarship Object</param>
        public void Delete(SkillSmart.Dto.Scholarship entity)
        {
            Scholarship seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Scholarship, SkillSmartMongoDA.Entities.Scholarship>(entity);
            base.Delete(seeker);
        }
    }
}
