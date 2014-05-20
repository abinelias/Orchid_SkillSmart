using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class CertificationService : EntityService<Certification>, ICertificationService<SkillSmart.Dto.Certification>
    {
        public CertificationService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to Get list of all certification of the jobseeker
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>List of Jobseeker Certifications</returns>
        public IEnumerable<SkillSmart.Dto.Certification> GetJobSeekerCertificationById(string id)
        {
            var jobSeekerCertificationList = this.MongoCollection.FindAllAs<Certification>();

            List<SkillSmart.Dto.Certification> jobSeekerCertification = new List<SkillSmart.Dto.Certification>();
            foreach (Certification jobSeeker in jobSeekerCertificationList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.Certification jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Certification, SkillSmart.Dto.Certification>(jobSeeker);
                    jobSeekerCertification.Add(jobSeekerObj);
                }
            }
            return jobSeekerCertification;
        }

        /// <summary>
        /// Function TO create a new Certification for jobseeker
        /// </summary>
        /// <param name="entity"></param>
        public void Create(SkillSmart.Dto.Certification entity)
        {
            Certification seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Certification, SkillSmartMongoDA.Entities.Certification>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }

        /// <summary>
        /// Function to get details of certification details of a jobseeker
        /// </summary>
        /// <param name="id">CertificationId</param>
        /// <returns>CertificationObject</returns>
        public new SkillSmart.Dto.Certification GetById(string id)
        {
            Certification dbObj = base.GetById(id);
            SkillSmart.Dto.Certification seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Certification, SkillSmart.Dto.Certification>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function To update Certification details of the jobseeker
        /// </summary>
        /// <param name="entity">CertificationObject</param>
        public void Update(SkillSmart.Dto.Certification entity)
        {
            Certification seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Certification, SkillSmartMongoDA.Entities.Certification>(entity);
            base.Update(seeker);
        }

        /// <summary>
        /// Function To Delete Certification details of the jobseeker
        /// </summary>
        /// <param name="entity">CertificationObject</param>
        public void Delete(SkillSmart.Dto.Certification entity)
        {
            Certification seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Certification, SkillSmartMongoDA.Entities.Certification>(entity);
            base.Delete(seeker);
        }
    }
}
