using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface ICertificationService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetJobSeekerCertificationById(string id);

    }
}
