using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IScholarshipService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetAllScholarshipById(string id);

    }
}
