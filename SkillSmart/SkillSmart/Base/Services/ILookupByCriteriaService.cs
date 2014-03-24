using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    
    public interface ILookupByCriteriaService<T> : IEntityService<T> where T : IEntity
    {
        //IEnumerable<T> GetAll();
        IEnumerable<T> GetAll(string parentId);
    }
}
