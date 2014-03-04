using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class ExtraCurricularActivityService : EntityService<ExtraCurricularActivity>, IExtraCurricularActivityService<SkillSmart.Dto.ExtraCurricularActivity>
    {
        public ExtraCurricularActivityService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to get all extra curricular activity
        /// </summary>
        /// <param name="id">EducationId</param>
        /// <returns>ExtraCurricularActivity List</returns>
        public IEnumerable<SkillSmart.Dto.ExtraCurricularActivity> GetAllExtraCurricularActivityById(string id)
        {
            var jobSeekerExtraCurricularActivityList = this.MongoCollection.FindAllAs<ExtraCurricularActivity>();

            List<SkillSmart.Dto.ExtraCurricularActivity> jobSeekerExtraCurricularActivity = new List<SkillSmart.Dto.ExtraCurricularActivity>();
            foreach (ExtraCurricularActivity jobSeeker in jobSeekerExtraCurricularActivityList)
            {
                if (jobSeeker.EducationId == id)
                {
                    SkillSmart.Dto.ExtraCurricularActivity jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.ExtraCurricularActivity, SkillSmart.Dto.ExtraCurricularActivity>(jobSeeker);
                    jobSeekerExtraCurricularActivity.Add(jobSeekerObj);
                }
            }
            return jobSeekerExtraCurricularActivity;
        }

        /// <summary>
        ///  Function to get all extra curricular activity
        /// </summary>
        /// <param name="entity">ExtraCurricularActivity Object</param>
        public void Create(SkillSmart.Dto.ExtraCurricularActivity entity)
        {
            ExtraCurricularActivity seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.ExtraCurricularActivity, SkillSmartMongoDA.Entities.ExtraCurricularActivity>(entity);
            base.Create(seeker);
        }

        /// <summary>
        /// Function to get an ExtraCurricular Activity details
        /// </summary>
        /// <param name="id">ExtraCurricularActivityId</param>
        /// <returns>ExtraCurricularActivity Object</returns>
        public new SkillSmart.Dto.ExtraCurricularActivity GetById(string id)
        {
            ExtraCurricularActivity dbObj = base.GetById(id);
            SkillSmart.Dto.ExtraCurricularActivity seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.ExtraCurricularActivity, SkillSmart.Dto.ExtraCurricularActivity>(dbObj);
            return seeker;
        }

        /// <summary>
        ///  Function to Update an extra curricular activity
        /// </summary>
        /// <param name="entity">ExtraCurricularActivity Object</param>
        public void Update(SkillSmart.Dto.ExtraCurricularActivity entity)
        {
            ExtraCurricularActivity seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.ExtraCurricularActivity, SkillSmartMongoDA.Entities.ExtraCurricularActivity>(entity);
            base.Update(seeker);         
        }

        /// <summary>
        ///  Function to Delete an extra curricular activity
        /// </summary>
        /// <param name="entity">ExtraCurricularActivity Object</param>
        public void Delete(SkillSmart.Dto.ExtraCurricularActivity entity)
        {
            ExtraCurricularActivity seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.ExtraCurricularActivity, SkillSmartMongoDA.Entities.ExtraCurricularActivity>(entity);
            base.Delete(seeker);
        }
    }
}
