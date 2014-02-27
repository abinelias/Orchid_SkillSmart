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

        public IEnumerable<SkillSmart.Dto.Certification> GetJobSeekerCertification(string id)
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

        public void Create(SkillSmart.Dto.Certification entity)
        {
            Certification seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Certification, SkillSmartMongoDA.Entities.Certification>(entity);
            base.Create(seeker);
        }

        public new SkillSmart.Dto.Certification GetById(string id)
        {
            Certification dbObj = base.GetById(id);
            SkillSmart.Dto.Certification seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Certification, SkillSmart.Dto.Certification>(dbObj);
            return seeker;
        }

        public void Update(SkillSmart.Dto.Certification entity)
        {
            Certification seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Certification, SkillSmartMongoDA.Entities.Certification>(entity);
            base.Update(seeker);
        }

        public void Delete(SkillSmart.Dto.Certification entity)
        {
            Certification seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Certification, SkillSmartMongoDA.Entities.Certification>(entity);
            base.Delete(seeker);
        }
    }
}
