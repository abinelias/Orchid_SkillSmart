using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface ISavedJobSearch<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetJobSeekerSavedJobSearchById(string id);

    }
}
