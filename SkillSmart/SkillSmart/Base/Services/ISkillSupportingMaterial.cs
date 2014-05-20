using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface ISkillSupportingMaterial<T> : IEntityService<T> where T : IEntity
    {
        IEnumerable<T> GetAllSupportingMaterial(string jobseekerId);
    }
}
